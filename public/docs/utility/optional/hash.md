# std::hash&lt;std::optional&gt;

Definido no header `[<optional>](<#/doc/header/optional>)`

```cpp
template< class T >
struct hash<std::optional<T>>;  // (desde C++17)
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para a classe [std::optional](<#/doc/utility/optional>) permite aos usuários obter hashes dos valores contidos em objetos `optional`.

A especialização `std::hash`<[std::optional](<#/doc/utility/optional>)&lt;T&gt;> é habilitada (veja [std::hash](<#/doc/utility/hash>)) se [std::hash](<#/doc/utility/hash>)<[std::remove_const_t](<#/doc/types/remove_cv>)&lt;T&gt;> for habilitada, e desabilitada caso contrário.

Quando habilitada, para um objeto `o` do tipo [std::optional](<#/doc/utility/optional>)&lt;T&gt; que contém um valor, `std::hash`<[std::optional](<#/doc/utility/optional>)&lt;T&gt;>()(o) avalia para o mesmo valor que [std::hash](<#/doc/utility/hash>)<[std::remove_const_t](<#/doc/types/remove_cv>)&lt;T&gt;>()(*o). Para um optional que não contém um valor, o hash é não especificado.

As funções membro desta especialização não são garantidas como noexcept porque o hash do tipo subjacente pode lançar uma exceção.

### Parâmetros de template

- **T** — o tipo do valor contido no objeto `optional`

### Exemplo

Execute este código
```
    #include <iostream>
    #include <optional>
    #include <string>
    #include <unordered_set>
    
    using namespace std::literals;
    
    int main()
    {
        using OptStr = std::optional<std::string>;
    
        // hash<optional> makes it possible to use unordered_set
        std::unordered_set<OptStr> s =
        {
            "ABC"s, "abc"s, std::nullopt, "def"s
        };
    
        for (const auto& o : s)
            std::cout << o.value_or("(null)") << '\t' << std::hash<OptStr>{}(o) << '\n';
    }
```

Saída possível:
```
    def     11697390762615875584
    (null)  18446744073709548283
    abc     3663726644998027833
    ABC     11746482041453314842
```

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(class template)