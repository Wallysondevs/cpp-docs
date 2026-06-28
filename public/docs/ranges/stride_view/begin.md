# std::ranges::stride_view&lt;V&gt;::begin

```cpp
constexpr auto begin() requires (!__simple_view<V>);  // (1) (desde C++23)
constexpr auto begin() const requires ranges::range<const V>;  // (2) (desde C++23)
```

  
Retorna um [iterator](<#/doc/ranges/stride_view/iterator>) para o primeiro elemento da `stride_view`. 

1) Equivalente a `return iterator<false>(this, [ranges::begin](<#/doc/ranges/begin>)(base_));`.

2) Equivalente a `return iterator<true>(this, [ranges::begin](<#/doc/ranges/begin>)(base_));`.

A sobrecarga (1) não participa da resolução de sobrecarga se V for uma [simple view](<#/doc/ranges>) (isto é, se V e `const V` forem views com os mesmos tipos de iterator e sentinel). 

### Parâmetros

(nenhum) 

### Valor de retorno

[Iterator](<https://en.cppreference.com/mwiki/index.php?title=cpp/ranges/stride_view/Iterator&action=edit&redlink=1> "cpp/ranges/stride view/Iterator \(page does not exist\)") para o primeiro elemento da view. 

### Exemplo

Um link para testar: [Compiler Explorer](<https://godbolt.org/z/36zTEETx1>).

Execute este código
```cpp 
    #include <print>
    #include <ranges>
    
    int main()
    {
        constexpr auto v = {'A', 'B', 'C'};
        const auto x = v | std::views::stride(2);
        const auto y = v | std::views::reverse | std::views::stride(2);
        const auto z = v | std::views::stride(2) | std::views::reverse;
        std::println("{} {} {}", *x.begin(), *y.begin(), *z.begin());
    }
```

Saída: 
```
    A C C
```

### Veja também

[ end](<#/doc/ranges/stride_view/end>) | retorna um iterator ou um sentinel para o fim   
(função membro pública)  