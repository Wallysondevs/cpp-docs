# std::reference_wrapper&lt;T&gt;::get, std::reference_wrapper&lt;T&gt;::operator T&amp;

```cpp
operator T& () const noexcept;  // (1) (desde C++11)
(constexpr desde C++20)
T& get() const noexcept;  // (2) (desde C++11)
(constexpr desde C++20)
```

Retorna a referência armazenada.

### Parâmetros

(nenhum)

### Valor de retorno

A referência armazenada.

### Exemplo

Execute este código
```
    #include <cassert>
    #include <functional>
    #include <map>
    #include <optional>
    #include <string_view>
    
    using Map = std::map<std::string_view, int>;
    using Opt = std::optional<std::reference_wrapper<Map::value_type>>;
    
    Opt find(Map& m, std::string_view s)
    {
        auto it = m.find(s);
        return it == m.end() ? Opt{} : Opt{*it};
    }
    
    int main()
    {
        Map m{{"A", 1}, {"B", 2}, {"C", 3}};
    
        if (auto opt = find(m, "C"); opt)
            opt->get().second = 42;
            // std::optional::operator->() retorna uma referência para std::reference_wrapper, então
            // reference_wrapper::get() retorna uma referência para map::value_type, ou seja, std::pair
    
        assert(m["C"] == 42);
    }
```

### Veja também

[ operator()](<#/>) | chama a função armazenada
(função membro pública)