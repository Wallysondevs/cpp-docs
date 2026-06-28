# std::optional&lt;T&gt;::begin

```cpp
constexpr iterator begin() noexcept;  // (desde C++26)
constexpr const_iterator begin() const noexcept;  // (desde C++26)
```

  
Se *this contiver um valor, retorna um iterator para o valor contido. Caso contrário, um valor de iterator "past-the-end".

### Parâmetros

(nenhum) 

### Valor de retorno

Iterator para o valor contido se has_value() for true. Caso contrário, um iterator "past-the-end".

### Complexidade

Constante. 

### Notas

[Macro de teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Padrão | Funcionalidade   
---|---|---|---
[`__cpp_lib_optional_range_support`](<#/doc/feature_test>) | [`202406L`](<#/>) | (C++26) | Suporte a range para `std::optional`  
  
### Exemplo

Execute este código
```
    #include <optional>
    #include <print>
    #include <vector>
     
    int main()
    {
        constexpr std::optional<int> none = std::nullopt;
        constexpr std::optional<int> some = 42;
     
        static_assert(none.begin() == none.end());
        static_assert(some.begin() != some.end());
     
        // ranged-for loop support
        for (int i : none)
            std::println("'none' has a value of {}", i);
     
        for (int i : some)
            std::println("'some' has a value of {}", i);
     
        std::optional<std::vector<int>> many({0, 1, 2});
        for (const auto& v : many)
            std::println("'many' has a value of {}", v);
    }
```

Saída: 
```
    'some' has a value of 42
    'many' has a value of [0, 1, 2]
```

### Veja também

[ end](<#/doc/utility/optional/end>)(C++26) | retorna um iterator para o fim   
(função membro pública)  