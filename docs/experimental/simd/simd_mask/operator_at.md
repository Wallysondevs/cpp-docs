# std::experimental::simd_mask&lt;T,Abi&gt;::operator[]

reference operator[]( size_t i ); | (1) | (parallelism TS v2)
---|---|---
bool operator[]( size_t i ) const; | (2) | (parallelism TS v2)

Os operadores de subscrito permitem ler e escrever elementos individuais de um `simd_mask`.

1) Retorna um proxy de referência para o i-ésimo elemento. Este tipo de proxy não deve ser capturado em um lvalue. Lvalues de `simd_mask::reference` só podem ser convertidos para `value_type`. Rvalues de `simd_mask::reference` sobrecarregam a atribuição e todos os operadores de atribuição composta, bem como `swap`.

2) Retorna um prvalue do i-ésimo elemento. Em contraste com containers, que contêm objetos do tipo `value_type`, um `simd_mask` não é um container de objetos individuais e, portanto, não pode retornar uma lvalue-reference.

### Parâmetros

- **i** — o índice do elemento. Deve ser menor que [`size()`](<#/doc/experimental/simd/simd_mask/size>)

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <experimental/simd>
    #include <iostream>
    namespace stdx = std::experimental;
     
    int main()
    {
        stdx::native_simd_mask<int> a{true};
        a[1] = 0;
        for (std::size_t i = 0; i != a.size(); ++i)
            std::cout << a[i] << ' ';
        std::cout << '\n';
    }
```

Saída possível:
```
    1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1
```