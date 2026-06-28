# std::align_val_t

Definido no cabeçalho `[<new>](<#/doc/header/new>)`

```c
enum class align_val_t : std::size_t {};
```

  
Tanto a [new-expression](<#/doc/language/new>) quanto a [delete-expression](<#/doc/language/delete>), quando usadas com objetos cujo requisito de alinhamento é maior que `__STDCPP_DEFAULT_NEW_ALIGNMENT__`, passam esse requisito de alinhamento como um argumento do tipo `std::align_val_t` para a função de alocação/desalocação selecionada.

### Notas

O alinhamento (obtido por alignof) tem o tipo [std::size_t](<#/doc/types/size_t>), mas as formas de posicionamento (placement forms) das funções de alocação e desalocação que aceitam [std::size_t](<#/doc/types/size_t>) como um parâmetro adicional já estão em uso, então este tipo é usado em vez disso.

Macro de teste de recurso | Valor | Std | Recurso   
---|---|---|---
[`__cpp_aligned_new`](<#/doc/feature_test>) | [`201606L`](<#/>) | (C++17) | Alocação de memória dinâmica para dados super-alinhados   
  
### Veja também

[ operator newoperator new[]](<#/doc/memory/new/operator_new>) |  funções de alocação   
(função)  
[ operator deleteoperator delete[]](<#/doc/memory/new/operator_delete>) |  funções de desalocação   
(função)