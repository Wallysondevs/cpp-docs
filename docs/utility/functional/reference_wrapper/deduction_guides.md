# Guias de dedução para std::reference_wrapper

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< typename T >
reference_wrapper( T& ) -> reference_wrapper<T>;
```

Um [guia de dedução](<#/doc/language/ctad>) é fornecido para [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>) para suportar a dedução do único parâmetro de template de classe.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2981](<https://cplusplus.github.io/LWG/issue2981>) | C++17 | um guia de dedução redundante de `reference_wrapper<T>` foi fornecido | removido
[LWG 2993](<https://cplusplus.github.io/LWG/issue2993>) | C++17 | a resolução do defeito removeu um construtor usado para dedução de argumento de template de classe | adicionado guia de dedução para compensar