# std::packaged_task&lt;R(Args...)&gt;::get_future

```cpp
std::future<R> get_future();  // (desde C++11)
```

  
Retorna um `future` que compartilha o mesmo estado compartilhado que *this.

`get_future` pode ser chamado apenas uma vez para cada `packaged_task`.

### Parâmetros

(nenhum)

### Valor de retorno

Um future que compartilha o mesmo estado compartilhado que *this.

### Exceções

[std::future_error](<#/doc/thread/future_error>) nas seguintes condições de erro:

  * O estado compartilhado já foi recuperado através de uma chamada para `get_future`. A categoria de erro é definida como [`future_already_retrieved`](<#/doc/thread/future_errc>).
  * *this não possui estado compartilhado. A categoria de erro é definida como [`no_state`](<#/doc/thread/future_errc>).
