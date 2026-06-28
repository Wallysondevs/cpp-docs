# std::experimental::simd&lt;T,Abi&gt;::operator++, std::experimental::simd&lt;T,Abi&gt;::operator--

simd& operator++() noexcept; | (1) | (parallelism TS v2)
---|---|---
simd operator++( int ) noexcept; | (2) | (parallelism TS v2)
simd& operator\--() noexcept; | (3) | (parallelism TS v2)
simd operator\--( int ) noexcept; | (4) | (parallelism TS v2)

Aplica o operador de incremento ou decremento em cada elemento do `simd`.

1) Incrementa todos os valores no `simd` em 1 e retorna uma referência para si mesmo.

2) Incrementa todos os valores no `simd` em 1 e retorna uma cópia de si mesmo antes da operação.

3) Decrementa todos os valores no `simd` em 1 e retorna uma referência para si mesmo.

4) Decrementa todos os valores no `simd` em 1 e retorna uma cópia de si mesmo antes da operação.

### Exemplo

Execute este código
```
    #include <cstddef>
    #include <experimental/simd>
    #include <iostream>
    namespace stdx = std::experimental;
    
    void print(auto rem, auto const& a)
    {
        std::cout << rem << ": ";
        for (std::size_t i{}; i != std::size(a); ++i)
            std::cout << a[i] << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        stdx::native_simd<int> p = -2;
        print('p', p);
    
        ++p;
        print('p', p);
    
        auto q = p--;
        print('p', p);
        print('q', q);
    }
```

Saída possível:
```
    p: -2 -2 -2 -2
    p: -1 -1 -1 -1
    p: -2 -2 -2 -2
    q: -1 -1 -1 -1
```