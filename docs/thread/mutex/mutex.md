# std::mutex::mutex

```cpp
constexpr mutex() noexcept;  // (1) (desde C++11)
mutex( const mutex& ) = delete;  // (2) (desde C++11)
```

1) Constrói o mutex. O mutex está em estado desbloqueado após a conclusão do construtor.

2) O construtor de cópia é deletado.

### Parâmetros

(nenhum)

### Notas

Como o construtor padrão é constexpr, mutexes estáticos são inicializados como parte da [inicialização estática não-local](<#/doc/language/initialization>), antes que qualquer inicialização dinâmica não-local comece. Isso torna seguro bloquear um mutex em um construtor de qualquer objeto estático.

### Veja também

[documentação C](<#/>) para mtx_init
---