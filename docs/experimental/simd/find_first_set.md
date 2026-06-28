# std::experimental::find_first_set, std::experimental::find_last_set

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T, class Abi >
int find_first_set( const simd_mask<T, Abi>& k );
template< class T, class Abi >
int find_last_set( const simd_mask<T, Abi>& k );
```

1) Retorna o menor índice `i` onde k[i] é true.

2) Retorna o maior índice `i` onde k[i] é true.

O comportamento é indefinido se any_of(k) for false.

### Parâmetros

- **k** — a [`simd_mask`](<#/doc/experimental/simd/simd_mask>) para aplicar a redução

### Valor de retorno

Um int no intervalo `[`0`, `simd_size_v<T, Abi>`)`.

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <experimental/simd>
    #include <iostream>
    
    namespace stdx = std::experimental;
    
    template<typename Abi>
    int find(stdx::simd_mask<Abi> const& v)
    {
        if (stdx::any_of(v))
            return find_first_set(v);
        return -1;
    }
    
    int main()
    {
        stdx::simd_mask<short> a{0};
        a[2] = a[a.size() - 2] = 1;
    
        for (std::size_t i = 0; i < a.size(); ++i)
            std::cout << a[i] << ' ';
        std::cout << '\n';
    
        std::cout << "find_first_set: " << stdx::find_first_set(a) << '\n';
        std::cout << "find_last_set: " << stdx::find_last_set(a) << '\n';
        std::cout << "find: " << find(a) << '\n';
        a[2] = 0;
        std::cout << "find: " << find(a) << '\n';
        a[a.size() - 2] = 0;
        std::cout << "find: " << find(a) << '\n';
    }
```

Saída possível:
```
    0 0 1 0 0 0 1 0 
    find_first_set: 2
    find_last_set: 6
    find: 2
    find: 6
    find: -1
```