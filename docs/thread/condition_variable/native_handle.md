# std::condition_variable::native_handle

```cpp
native_handle_type native_handle();  // (desde C++11)
```

Acessa o handle nativo de *this.

O significado e o tipo do resultado desta função são definidos pela implementação. Em um sistema POSIX, este pode ser um valor do tipo pthread_cond_t*. Em um sistema Windows, este pode ser um PCONDITION_VARIABLE.

### Parâmetros

(nenhum)

### Valor de retorno

O handle nativo desta condition variable.

### Veja também

[ native_handle](<#/doc/thread/thread/native_handle>) | retorna o handle de thread subjacente definido pela implementação
(função membro pública de `std::thread`)
[ native_handle](<#/doc/thread/jthread/native_handle>) | retorna o handle de thread subjacente definido pela implementação
(função membro pública de `std::jthread`)