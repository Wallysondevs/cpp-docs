# std::ranges::chunk_view&lt;V&gt;::size

```cpp
constexpr auto size() requires ranges::sized_range<V>;  // (1) (desde C++23)
constexpr auto size() const requires ranges::sized_range<const V>;  // (2) (desde C++23)
```

  
Retorna o número de elementos, que é o menor valor inteiro que não é menor que o quociente da divisão do tamanho da view subjacente [`_base__`](<#/doc/ranges/chunk_view>) pelo membro de dados subjacente [`_n__`](<#/doc/ranges/chunk_view>), que armazena o número passado ao construtor (​0​ se construído por padrão). Equivalente a
```
    return __to_unsigned_like(__div_ceil(ranges::distance(base_), n_));
```

### Parâmetros

(nenhum) 

### Valor de retorno

O número de elementos. 

### Exemplo

Execute este código
```
    #include <ranges>
     
    int main()
    {
        constexpr static auto v = {1, 2, 3, 4, 5};
        constexpr auto w{ std::ranges::chunk_view(v, 2) };
        static_assert(w.size() == (5 / 2 + (5 % 2 ? 1 : 0)));
    }
```

### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) |  retorna um inteiro igual ao tamanho de um range  
(objeto de ponto de customização)  
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) |  retorna um inteiro assinado igual ao tamanho de um range  
(objeto de ponto de customização)