# std::barrier&lt;CompletionFunction&gt;::barrier

```cpp
constexpr explicit barrier( std::ptrdiff_t expected,
CompletionFunction f = CompletionFunction());  // (1) (desde C++20)
barrier( const barrier& ) = delete;  // (2) (desde C++20)
```

  
1) Define tanto a contagem esperada inicial para cada fase quanto a contagem esperada atual para a primeira fase como `expected`, inicializa o objeto da função de conclusão com `std::move(f)`, e então inicia a primeira fase. O comportamento é indefinido se `expected` for negativo ou maior que [`max()`](<#/doc/thread/barrier/max>).

2) O construtor de cópia é deletado. `barrier` não é copiável nem movível.

### Parâmetros

expected  |  \-  |  valor inicial da contagem esperada   
---|---|---
f  |  \-  |  objeto da função de conclusão a ser chamado na etapa de conclusão da fase   
  
### Exceções

1) Qualquer exceção lançada pelo construtor de movimento de `CompletionFunction`.

### Notas

`expected` pode ser zero. No entanto, chamar qualquer função membro não estática que não seja o destrutor em tal `barrier` resulta em comportamento indefinido. Em outras palavras, tal `barrier` só pode ser destruída. 