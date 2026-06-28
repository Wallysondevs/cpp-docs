# std::regex_token_iterator&lt;BidirIt,CharT,Traits&gt;::operator==, operator!=

```cpp
bool operator==( const regex_token_iterator& other ) const;  // (1) (desde C++11)
bool operator!=( const regex_token_iterator& other ) const;  // (2) (desde C++11)
(até C++20)
```

  
Verifica se *this e other são equivalentes.

Dois iteradores de token de regex são iguais se:

a) Ambos são iteradores de fim de sequência.

b) Ambos são iteradores de sufixo e os sufixos são iguais.

c) Nenhum deles é um iterador de fim de sequência ou de sufixo e:

    

    

  * position == other.position
  * N == other.N
  * subs == other.subs

  

1) Verifica se *this é _igual a_ other.

2) Verifica se *this é _diferente de_ other.

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
| Esta seção está incompleta
Razão: Explicar melhor. Por exemplo, `subs` é um vetor de subexpressões correspondidas apenas para exposição.
```
  
### Parâmetros

other  |  \-  |  outro iterador de token de regex para comparar   
  
### Valor de retorno

1) true se *this for _igual a_ other, false caso contrário.

2) true se *this for _diferente de_ other, false caso contrário.