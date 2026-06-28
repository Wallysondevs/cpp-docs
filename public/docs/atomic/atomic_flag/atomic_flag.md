# std::atomic_flag::atomic_flag

```cpp
Definido no header `<atomic>`
  // (1)
atomic_flag() noexcept = default;  // (desde C++11)
(até C++20)
constexpr atomic_flag() noexcept;  // (desde C++20)
atomic_flag( const atomic_flag& ) = delete;  // (2) (desde C++11)
```

Constrói um novo [std::atomic_flag](<#/doc/atomic/atomic_flag>).

1) Construtor padrão trivial, inicializa [std::atomic_flag](<#/doc/atomic/atomic_flag>) para um estado não especificado. | (até C++20)
---|---
1) Inicializa [std::atomic_flag](<#/doc/atomic/atomic_flag>) para o estado "clear". | (desde C++20)

2) O construtor de cópia é deletado; [std::atomic_flag](<#/doc/atomic/atomic_flag>) não é copiável.

Além disso, [std::atomic_flag](<#/doc/atomic/atomic_flag>) pode ser inicializado por valor para o estado "clear" com a expressão [ATOMIC_FLAG_INIT](<#/doc/atomic/ATOMIC_FLAG_INIT>). Para um `atomic_flag` com [duração de armazenamento](<#/doc/language/storage_duration>) estática, isso garante [inicialização estática](<#/doc/language/initialization>): a flag pode ser usada em construtores de objetos estáticos.

### Veja também

[ ATOMIC_FLAG_INIT](<#/doc/atomic/ATOMIC_FLAG_INIT>)(C++11) | inicializa um [std::atomic_flag](<#/doc/atomic/atomic_flag>) para false
(macro constante)