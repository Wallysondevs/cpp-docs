# std::allocator_traits&lt;Alloc&gt;::allocate_at_least

```cpp
static constexpr std::allocation_result<pointer, size_type>
allocate_at_least( Alloc& a, size_type n );  // (desde C++23)
```

  
`allocate_at_least` chama a.allocate_at_least(n) e retorna seu resultado se a chamada for bem-formada; caso contrário, é equivalente a return {a.allocate(n), n};. 

`allocator_at_least` tenta alocar um armazenamento para pelo menos n objetos do tipo `value_type`, e fornece um mecanismo de fallback que aloca um armazenamento para exatamente n objetos. 

### Parâmetros

a  |  \-  |  um allocator usado para alocar armazenamento   
---|---|---
n  |  \-  |  o limite inferior do número de objetos para os quais alocar armazenamento   
  
### Valor de retorno

a.allocate_at_least(n) se for bem-formado. 

Caso contrário, [std::allocation_result](<#/doc/memory/allocation_result>)<pointer, size_type>{a.allocate(n), n}. 

### Exceções

Lança o que e quando a função de alocação selecionada lança. 

### Observações

A função membro `allocate_at_least` dos tipos [Allocator](<#/doc/named_req/Allocator>) é fornecida principalmente para containers contíguos, como [std::vector](<#/doc/container/vector>) e [std::basic_string](<#/doc/string/basic_string>), a fim de reduzir a realocação, fazendo com que sua capacidade corresponda ao tamanho realmente alocado quando possível. Como `allocate_at_least` fornece um mecanismo de fallback, ele pode ser usado diretamente onde apropriado. 

Dado um objeto allocator `a` do tipo `Alloc`, seja `result` o valor retornado de [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Alloc&gt;::allocate_at_least(a, n), o armazenamento deve ser desalocado por a.deallocate(result.ptr, m) (tipicamente chamado via [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Alloc&gt;::deallocate(a, result.ptr, m)) a fim de evitar vazamento de memória. 

O argumento `m` usado na desalocação não deve ser menor que `n` e não maior que `result.count`; caso contrário, o comportamento é indefinido. Observe que `n` é sempre igual a `result.count` se o allocator não fornecer `allocate_at_least`, o que significa que `m` é exigido ser igual a `n`. 

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_allocate_at_least`](<#/doc/feature_test>) | [`202302L`](<#/>) | (C++23) | [`allocate_at_least`](<#/doc/memory/allocator_traits/allocate_at_least>) etc.   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ allocate_at_least](<#/doc/memory/allocator/allocate_at_least>)(C++23) | aloca armazenamento não inicializado pelo menos tão grande quanto o tamanho solicitado   
(função membro pública de `std::allocator<T>`)  