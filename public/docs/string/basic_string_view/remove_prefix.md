# std::basic_string_view&lt;CharT,Traits&gt;::remove_prefix

```cpp
constexpr void remove_prefix( size_type n );  // (desde C++17)
```

  
Move o início da view para frente em n caracteres.

O comportamento é indefinido se n > size().

### Parâmetros

n  |  \-  |  número de caracteres a remover do início da view   
  
### Valor de retorno

(nenhum)

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string_view>
    
    using namespace std::literals;
    
    [[nodiscard("a pure function")]]
    constexpr std::size_t count_substrings(std::string_view hive, std::string_view const bee)
    {
        if (hive.empty() || bee.empty())
            return 0U;
    
        std::size_t buzz{};
        while (bee.size() <= hive.size())
        {
            const auto pos = hive.find(bee);
            if (pos == hive.npos)
                break;
            ++buzz;
            hive.remove_prefix(pos + bee.size());
        }
        return buzz;
    }
    
    int main()
    {
        std::string str = "   trim me";
        std::string_view v = str;
        v.remove_prefix(std::min(v.find_first_not_of(" "), v.size()));
        std::cout << "String: '" << str << "'\n"
                  << "View  : '" << v << "'\n";
    
        constexpr auto hive{"bee buzz bee buzz bee"};
        std::cout << "There are " << count_substrings(hive, "bee") << " bees in this hive.\n";
    }
```

Saída:
```
    String: '   trim me'
    View  : 'trim me'
    There are 3 bees in this hive.
```

### Veja também

[ remove_suffix](<#/doc/string/basic_string_view/remove_suffix>) | diminui a view movendo seu fim para trás   
(função membro pública)  