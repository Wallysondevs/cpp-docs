# std::exception::exception

```cpp
  // (1)
exception() throw();  // (até C++11)
exception() noexcept;  // (desde C++11)
(constexpr desde C++26)
  // (2)
exception( const exception& other ) throw();  // (até C++11)
exception( const exception& other ) noexcept;  // (desde C++11)
(constexpr desde C++26)
```

  
Constrói um novo objeto exception. 

1) Construtor padrão. [what()](<#/doc/error/exception/what>) retorna uma string definida pela implementação.

2) Construtor de cópia. Inicializa o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::exception`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0.

### Parâmetros

other  |  \-  |  outra exception para atribuir o conteúdo de   
  
### Notas

Como a cópia de `std::exception` não é permitida a lançar exceções, quando classes derivadas (como [std::runtime_error](<#/doc/error/runtime_error>)) precisam gerenciar uma mensagem de diagnóstico definida pelo usuário, isso é tipicamente implementado como uma string copy-on-write. 

A implementação da Microsoft inclui construtores não-padrão que aceitam strings, permitindo assim que instâncias sejam lançadas diretamente com uma mensagem de erro significativa. Os equivalentes padrão mais próximos são [std::runtime_error](<#/doc/error/runtime_error>) ou [std::logic_error](<#/doc/error/logic_error>). 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 471](<https://cplusplus.github.io/LWG/issue471>) | C++98  | não há requisito sobre [what()](<#/doc/error/exception/what>) da cópia da exception  | adicionado 