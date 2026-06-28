# std::condition_variable::condition_variable

```cpp
condition_variable();  // (1) (desde C++11)
condition_variable( const condition_variable& ) = delete;  // (2) (desde C++11)
```

1) Constrói um objeto do tipo `std::condition_variable`.

2) O construtor de cópia é deletado.

### Parâmetros

(nenhum)

### Exceções

1) Pode lançar [std::system_error](<#/doc/error/system_error>) com [std::error_condition](<#/doc/error/error_condition>) igual a [std::errc::operation_not_permitted](<#/doc/error/errc>) se a thread não tiver privilégio para criar uma condition variable, [std::errc::resource_unavailable_try_again](<#/doc/error/errc>) se uma limitação de recurso não-memória impedir esta inicialização, ou outro valor definido pela implementação.

### Veja também

[Documentação C](<#/>) para cnd_init
---