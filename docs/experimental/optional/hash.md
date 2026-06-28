# std::hash &lt;std::experimental::optional&gt;

Definido no cabeçalho `[<experimental/optional>](<#/doc/header/experimental/optional>)`

```c
template< class T >
struct hash<std::experimental::optional<T>>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para a classe [std::experimental::optional](<#/doc/experimental/optional>) permite aos usuários obter hashes dos valores contidos em objetos `optional`.

### Parâmetros de template

- **T** — o tipo do valor contido no objeto `optional`. A especialização [std::hash](<#/doc/utility/hash>)&lt;T&gt; deve satisfazer os requisitos do template de classe `hash`.

### Exemplo

Execute este código
```cpp
    #include <experimental/optional>
    #include <iostream>
    #include <string>
    #include <unordered_set>
    using namespace std::literals;
    
    int main()
    {
        // hash<optional> makes it possible to use unordered_set
        std::unordered_set<std::experimental::optional<std::string>> s = {
            "abc"s, std::experimental::nullopt, "def"s
        };
    
        for (const auto& o : s)
            std::cout << o.value_or("(null)") << ' ';
        std::cout << '\n';
    }
```

Saída possível:
```
    def abc (null)
```

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(template de classe)