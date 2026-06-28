# std::ranges::drop_while_view&lt;V,Pred&gt;::pred

```cpp
constexpr const Pred& pred() const;  // (desde C++20)
```

  
Retorna uma referência para o predicado armazenado.

Se *this não armazena um predicado (por exemplo, uma exceção é lançada na atribuição a *this, que copia-constrói ou move-constrói um `Pred`), o comportamento é indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Uma referência para o predicado armazenado [`_pred__`](<#/doc/ranges/drop_while_view>).

### Exemplo

Execute este código
```
    #include <array>
    #include <iomanip>
    #include <iostream>
    #include <ranges>
     
    int main()
    {
        constexpr std::array data{0, -1, -2, 3, 1, 4, 1, 5};
     
        auto view = std::ranges::drop_while_view
        {
            data,  { return x <= 0; }
        };
     
        std::cout << std::boolalpha;
        for (int x : data)
            std::cout << "predicate(" << std::setw(2) << x << ") : "
                      << view.pred()(x) << '\n';
    }
```

Saída: 
```
    predicate( 0) : true
    predicate(-1) : true
    predicate(-2) : true
    predicate( 3) : false
    predicate( 1) : false
    predicate( 4) : false
    predicate( 1) : false
    predicate( 5) : false
```