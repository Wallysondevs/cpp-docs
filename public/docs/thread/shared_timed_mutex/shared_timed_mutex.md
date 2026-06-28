# std::shared_timed_mutex::shared_timed_mutex

```cpp
shared_timed_mutex();  // (1) (desde C++14)
shared_timed_mutex( const shared_timed_mutex& ) = delete;  // (2) (desde C++14)
```

1) Constrói o mutex. O mutex está no estado desbloqueado após a chamada.

2) O construtor de cópia é deletado.

### Parâmetros

(nenhum)

### Exceções

[std::system_error](<#/doc/error/system_error>) se a construção não for bem-sucedida.

### Veja também

[documentação C](<#/>) para mtx_init
---