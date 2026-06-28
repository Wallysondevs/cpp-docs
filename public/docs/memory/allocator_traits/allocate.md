# std::allocator_traits&lt;Alloc&gt;::allocate

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
static pointer allocate( Alloc& a, size_type n );
(constexpr desde C++20)
static pointer allocate( Alloc& a, size_type n, const_void_pointer hint );
(constexpr desde C++20)
```

  
Usa o allocator `a` para alocar `n * sizeof(Alloc::value_type)` bytes de armazenamento não inicializado. Um array do tipo `Alloc::value_type[n]` é criado no armazenamento, mas nenhum de seus elementos é construído.

1) Chama `a.allocate(n)`.

2) Adicionalmente passa a dica de localidade de memória `hint`. Chama `a.allocate(n, hint)` se possível. Se não for possível (por exemplo, `a` não possui uma função membro `allocate` de dois argumentos), chama `a.allocate(n)`.

### Parâmetros

a  |  \-  |  allocator a ser usado   
---|---|---
n  |  \-  |  o número de objetos para os quais alocar armazenamento   
hint  |  \-  |  ponteiro para uma localização de memória próxima   
  
### Valor de retorno

O ponteiro retornado pela chamada a `a.allocate(n)`.

### Observações

`Alloc::allocate` não era exigido para criar um objeto array até [P0593R6](<https://wg21.link/P0593R6>), o que tornava o uso de um allocator não padrão para [std::vector](<#/doc/container/vector>) e alguns outros containers não bem-definido de acordo com uma leitura estrita da especificação da linguagem central.

Após chamar `allocate` e antes da construção dos elementos, a aritmética de ponteiros de `Alloc::value_type*` é bem-definida dentro do array alocado, mas o comportamento é indefinido se os elementos forem acessados.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ allocate](<#/doc/memory/allocator/allocate>) |  aloca armazenamento não inicializado   
(função membro pública de `std::allocator<T>`)  