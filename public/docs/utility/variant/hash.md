# std::hash&lt;std::variant&gt;

Definido no cabeçalho `[<variant>](<#/doc/header/variant>)`

```c
template< class... Types >
struct hash<std::variant<Types...>>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para o template [std::variant](<#/doc/utility/variant>) permite aos usuários obter hashes de objetos `variant`.

A especialização `std::hash`<[std::variant](<#/doc/utility/variant>)<Types...>> é habilitada (veja [std::hash](<#/doc/utility/hash>)) se cada especialização em `std::hash`<[std::remove_const_t](<#/doc/types/remove_cv>)&lt;Types&gt;>... for habilitada, e desabilitada caso contrário.

As funções membro desta especialização não têm garantia de serem noexcept.

### Parâmetros de template

- **Types** — os tipos das alternativas suportadas pelo objeto `variant`

### Observações

Ao contrário de [`std::hash<std::optional>`](<#/doc/utility/optional/hash>), o hash de um variant tipicamente não é igual ao hash do valor contido; isso torna possível distinguir [std::variant](<#/doc/utility/variant>)<int, int> que contém o mesmo valor como alternativas diferentes.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <variant>
    
    using Var = std::variant<int, int, int, std::string>;
    
    template<unsigned I>
    void print(Var const& var)
    {
        std::cout << "get<" << var.index() << "> = "
                  << std::get<I>(var)
                  << "\t" "# = "
                  << std::hash<Var>{}(var) << '\n';
    }
    
    int main()
    {
        Var var;
        std::get<0>(var) = 2020;
        print<0>(var);
        var.emplace<1>(2023);
        print<1>(var);
        var.emplace<2>(2026);
        print<2>(var);
        var = "C++";
        print<3>(var);
    }
```

Saída possível:
```
    get<0> = 2020   # = 2020
    get<1> = 2023   # = 2024
    get<2> = 2026   # = 2028
    get<3> = C++    # = 15518724754199266859
```

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(modelo de classe)