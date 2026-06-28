# std::shared_mutex::shared_mutex

```cpp
shared_mutex();  // (1) (desde C++17)
shared_mutex( const shared_mutex& ) = delete;  // (2) (desde C++17)
```

  
1) Constrói o mutex. O mutex está em estado desbloqueado após a chamada.

2) O construtor de cópia é excluído.

### Parâmetros

(nenhum) 

### Exceções

[std::system_error](<#/doc/error/system_error>) se a construção não for bem-sucedida. 

### Veja também

[Documentação C](<#/>) para mtx_init  
---