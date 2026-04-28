package com.smartcargo.apigateway.filter;

import com.smartcargo.apigateway.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<JwtAuthenticationFilter.Config> {

    @Autowired
    private JwtUtil jwtUtil;

    public JwtAuthenticationFilter() {
        super(Config.class);
    }


    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            // 1. Authorization Header එක තියෙනවද බලනවා
            if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                throw new RuntimeException("Missing Authorization Header");
            }

            String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            String token = null;

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }


            String userId = jwtUtil.extractUserId(token);

            if (userId == null) {
                System.out.println("!!! ERROR: User ID extracted is NULL !!!");
            } else {
                System.out.println(">>> SUCCESS: Extracted User ID: " + userId);
            }

            var modifiedRequest = exchange.getRequest().mutate()
                    .header("x-user-id", userId)
                    .build();


            return chain.filter(exchange.mutate().request(modifiedRequest).build());
        };
    }


    public static class Config {

    }
}