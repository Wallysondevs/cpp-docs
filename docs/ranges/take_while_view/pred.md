# std::ranges::take_while_view&lt;V,Pred&gt;::pred

```cpp
constexpr const Pred& pred() const;  // (desde C++20)
```

  
Retorna uma referência para o predicado armazenado [`_pred__`](<#/doc/ranges/take_while_view>). 

Se *this não armazena um predicado (por exemplo, uma exceção é lançada na atribuição a *this, que copia-constrói ou move-constrói um `Pred`), o comportamento é indefinido. 

### Parâmetros

(nenhum) 

### Valor de retorno

Uma referência para o predicado armazenado. 

### Exemplo

Execute este código
```cpp
    #include <ranges>
     
    int main()
    {
        static constexpr int a[]{1, 2, 3, 4, 5};
        constexpr auto v = a | std::views::take_while({ return x < 4; });
        const auto pred = v.pred();
        static_assert(pred(3));
    }
```

### Veja também

[ base](<#/doc/ranges/take_while_view/base>) |  retorna uma cópia da view subjacente (adaptada)   
(função membro pública)  