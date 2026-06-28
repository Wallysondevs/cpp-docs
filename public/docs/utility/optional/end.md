# std::optional&lt;T&gt;::end

```cpp
constexpr iterator end() noexcept;  // (desde C++26)
constexpr const_iterator end() const noexcept;  // (desde C++26)
```

  
Retorna um iterator past-the-end. Equivalente a `return begin() + has_value();`. 

### Parâmetros

(nenhum) 

### Valor de retorno

Iterator past-the-end 

### Complexidade

Constante. 

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_optional_range_support`](<#/doc/feature_test>) | [`202406L`](<#/>) | (C++26) | Suporte a range para `std::optional`  
  
### Exemplo

Execute este código
```
    #include <optional>
    #include <print>
     
    int main()
    {
        constexpr std::optional<int> none = std::nullopt; // optional @1
        constexpr std::optional<int> some = 42;           // optional @2
     
        static_assert(none.begin() == none.end());
        static_assert(some.begin() != some.end());
     
        // ranged-for loop support
        for (int i : none)
            std::println("Optional @1 has a value of {}", i);
     
        for (int i : some)
            std::println("Optional @2 has a value of {}", i);
    }
```

Saída: 
```
    Optional @2 has a value of 42
```

### Veja também

[ begin](<#/doc/utility/optional/begin>)(C++26) |  retorna um iterator para o início   
(função membro pública)  