# std::recursive_timed_mutex::recursive_timed_mutex

```cpp
recursive_timed_mutex();  // (1) (desde C++11)
recursive_timed_mutex( const recursive_timed_mutex& ) = delete;  // (2) (desde C++11)
```

1) Constrói o mutex. O mutex está no estado desbloqueado após a chamada.

2) O construtor de cópia é deletado.

### Parâmetros

(nenhum)

### Exceções

[std::system_error](<#/doc/error/system_error>) se a construção não for bem-sucedida.

### Ver também

[Documentação C](<#/>) para mtx_init
---