# std::experimental::simd&lt;T,Abi&gt;::operator!,~,+,-

mask_type operator!() const noexcept; | (1) | (parallelism TS v2)
---|---|---
simd operator~() const noexcept; | (2) | (parallelism TS v2)
simd operator+() const noexcept; | (3) | (parallelism TS v2)
simd operator-() const noexcept; | (4) | (parallelism TS v2)

Aplica o operador unário fornecido em cada elemento do [`simd`](<#/doc/experimental/simd/simd>).

1) Retorna um [`simd_mask<T, Abi>`](<#/doc/experimental/simd/simd_mask>) onde o i-ésimo elemento é igual a !operator[](i) para todo i no intervalo de `[`​0​`, `[`size()`](<#/doc/experimental/simd/simd/size>)`)`.

2) Retorna um `simd` onde cada bit é o inverso do bit correspondente em *this. Esta sobrecarga participa da resolução de sobrecarga apenas se `T` for um tipo integral.

3) Retorna uma cópia de si mesmo.

4) Retorna um `simd` onde o i-ésimo elemento é inicializado para -operator[](i) para todo i no intervalo de `[`​0​`, `[`size()`](<#/doc/experimental/simd/simd/size>)`)`.

### Exemplo

Run this code
```cpp
    #include <cstddef>
    #include <experimental/simd>
    #include <iostream>
    #include <string_view>
    namespace stdx = std::experimental;
     
    void println(std::string_view op, const stdx::native_simd_mask<int> x)
    {
        std::cout << op << ": ";
        for (std::size_t i = 0; i < x.size(); ++i)
            std::cout << std::boolalpha << x[i] << ' ';
        std::cout << '\n';
    }
     
    void println(std::string_view op, const stdx::native_simd<int> x)
    {
        std::cout << op << ": ";
        for (std::size_t i = 0; i < x.size(); ++i)
            std::cout << x[i] << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        const stdx::native_simd<int> a( { return i; });
     
        println("  a", a);
        println(" !a", !a);
        println(" ~a", ~a);
        println("~~a", ~~a);
        println(" +a", +a);
        println(" -a", -a);
        println("+-a", +-a);
    }
```

Saída possível:
```
      a: 0 1 2 3 
     !a: true false false false 
     ~a: -1 -2 -3 -4 
    ~~a: 0 1 2 3 
     +a: 0 1 2 3 
     -a: 0 -1 -2 -3 
    +-a: 0 -1 -2 -3
```