# std::inout_ptr_t&lt;Smart,Pointer,Args...&gt;::inout_ptr_t

```cpp
explicit inout_ptr_t( Smart &sp, Args... args );  // (1) (desde C++23)
inout_ptr_t( const inout_ptr_t& ) = delete;  // (2) (desde C++23)
```

1) Cria um `inout_ptr_t`. Adapta `sp` como se o ligasse ao membro `Smart&`, captura cada argumento `t` em `args...` como se inicializasse o membro correspondente do tipo `T` em `Args...` com [std::forward](<#/doc/utility/forward>)&lt;T&gt;(t), então inicializa o `Pointer` armazenado com `sp` se `Smart` for um tipo de ponteiro, caso contrário, inicializa-o com `sp.get()`. `sp.release()` pode ser chamado se `Smart` não for um tipo de ponteiro, caso em que não será chamado novamente dentro do destrutor.

2) O construtor de cópia é explicitamente deletado. `inout_ptr_t` não é copiável nem movível.

### Parâmetros

- **sp** — o objeto (tipicamente um smart pointer) a ser adaptado
- **args...** — os argumentos usados para redefinir e capturar

### Valor de retorno

(nenhum)

### Exceções

Pode lançar exceções definidas pela implementação.

### Notas

Se `Smart` não for um tipo de ponteiro e `sp.release()` não for chamado pelo construtor, ele pode ser chamado pelo destrutor antes de redefinir `sp`.

Cada argumento em `args...` é movido para o `inout_ptr_t` criado se for de um tipo de objeto, ou transferido para o `inout_ptr_t` criado como está se for de um tipo de referência.

O construtor de `inout_ptr_t` pode lançar exceções. Por exemplo, quando `sp` é um ponteiro intrusivo com um bloco de controle, a alocação para o novo bloco de controle pode ser realizada dentro do construtor em vez do destrutor.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo