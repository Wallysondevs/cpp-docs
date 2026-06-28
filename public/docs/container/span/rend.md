# std::span&lt;T,Extent&gt;::rend, std::span&lt;T,Extent&gt;::crend

```cpp
constexpr reverse_iterator rend() const noexcept;  // (1) (desde C++20)
constexpr const_reverse_iterator crend() const noexcept;  // (2) (desde C++23)
```

Retorna um reverse iterator para o elemento que segue o último elemento do `span` invertido. Ele corresponde ao elemento que precede o primeiro elemento do `span` não invertido. Este elemento atua como um marcador de posição (placeholder); tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Reverse iterator para o elemento que segue o último elemento.

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <span>
    #include <string_view>
    
    void ascending(const std::span<const std::string_view> data,
                   const std::string_view term)
    {
        std::for_each(data.begin(), data.end(),
             x) { std::cout << x << ' '; });
        std::cout << term;
    }
    
    void descending(const std::span<const std::string_view> data,
                    const std::string_view term)
    {
        std::for_each(data.rbegin(), data.rend(),
             x) { std::cout << x << ' '; });
        std::cout << term;
    }
    
    int main()
    {
        constexpr std::string_view bars[]{"▁","▂","▃","▄","▅","▆","▇","█"};
        ascending(bars, " ");
        descending(bars, "\n");
    }
```

Saída:
```
    ▁ ▂ ▃ ▄ ▅ ▆ ▇ █  █ ▇ ▆ ▅ ▄ ▃ ▂ ▁
```

### Veja também

[ rbegincrbegin](<#/doc/container/span/rbegin>)(C++23) | retorna um reverse iterator para o início
(função membro pública)
[ rendcrend](<#/doc/iterator/rend>)(C++14) | retorna um reverse end iterator para um container ou array
(modelo de função)