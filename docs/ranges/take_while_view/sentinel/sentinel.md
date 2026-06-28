# std::ranges::take_while_view&lt;V,Pred&gt;::sentinel&lt;Const&gt;::sentinel

```cpp
/*sentinel*/() = default;  // (1) (desde C++20)
constexpr explicit /*sentinel*/( ranges::sentinel_t<Base> end, const Pred* pred );  // (2) (desde C++20)
constexpr /*sentinel*/( /*sentinel*/<!Const> s )
requires Const &&
std::convertible_to<ranges::sentinel_t<V>, ranges::sentinel_t<Base>>;  // (3) (desde C++20)
```

  
Constrói um sentinel.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) o sentinel subjacente e o ponteiro para o predicado.

2) Inicializa o sentinel subjacente com end e o ponteiro para o predicado com pred.

3) Conversão de /*sentinel*/&lt;false&gt; para /*sentinel*/&lt;true&gt;. Constrói por cópia os membros correspondentes.

### Parâmetros

end  |  \-  |  um sentinel representando o fim de `V` (possivelmente qualificado como const)  
---|---|---
pred  |  \-  |  um ponteiro para predicado   
i  |  \-  |  um /*sentinel*/&lt;false&gt;  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   