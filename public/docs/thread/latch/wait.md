# std::latch::wait

```cpp
void wait() const;
```
| | | (desde C++20)

Bloqueia a thread chamadora até que o contador interno atinja 0. Se já for zero, retorna imediatamente.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Exceções

Lança [std::system_error](<#/doc/error/system_error>) com um código de erro permitido para tipos de mutex em caso de erro.