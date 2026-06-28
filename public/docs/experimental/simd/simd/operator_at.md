# std::experimental::simd&lt;T,Abi&gt;::operator[]

reference operator[]( [std::size_t](<#/doc/types/size_t>) i ); |  (1)  |  (parallelism TS v2)  
---|---|---
value_type operator[]( [std::size_t](<#/doc/types/size_t>) i ) const; |  (2)  |  (parallelism TS v2)  

  
Os operadores de subscrito permitem ler e escrever elementos individuais de um `simd`.

1) Retorna um proxy de referência para o i-ésimo elemento. Este tipo de proxy não deve ser capturado em um lvalue. Lvalues de `simd::reference` podem apenas converter para `value_type`. Rvalues de `simd::reference` sobrecarregam a atribuição e todos os operadores de atribuição composta, bem como `swap`.

2) Retorna um prvalue do i-ésimo elemento. Em contraste com containers, que contêm objetos do tipo `value_type`, um `simd` não é um container de objetos individuais e, portanto, não pode retornar uma lvalue-reference.

### Parâmetros

i  |  \-  |  o índice do elemento. Deve ser menor que [size()](<#/doc/experimental/simd/simd/size>)  
  
### Exemplo

Execute este código
```
    #include <cstddef>
    #include <cstdint>
    #include <experimental/simd>
    #include <iostream>
    namespace stdx = std::experimental;
     
    int main()
    {
        const stdx::native_simd<std::int64_t> a = 3;
        for (std::size_t i = 0; i != a.size(); ++i)
            std::cout << a[i] << ' ';
        std::cout << '\n';
    }
```

Saída possível: 
```
    3 3 3 3 3 3 3 3
```