# Cabeçalho da biblioteca padrão &lt;cstdarg&gt;

Este cabeçalho estava originalmente na biblioteca padrão C como [`<stdarg.h>`](<#/>).

Este cabeçalho fornece suporte para [funções variádicas no estilo C](<#/doc/utility/variadic>), enquanto a [definição C](<#/>) de "promoções de argumento padrão" é substituída pela [definição C++](<#/doc/language/variadic_arguments>).

### Tipos

---
[ va_list](<#/doc/utility/variadic/va_list>) | armazena as informações necessárias por [va_start](<#/doc/utility/variadic/va_start>), [va_arg](<#/doc/utility/variadic/va_arg>), [va_end](<#/doc/utility/variadic/va_end>), e [va_copy](<#/doc/utility/variadic/va_copy>)
(typedef)

### Macros

[ va_start](<#/doc/utility/variadic/va_start>) | permite o acesso aos argumentos de função variádica
(function macro)
[ va_arg](<#/doc/utility/variadic/va_arg>) | acessa o próximo argumento de função variádica
(function macro)
[ va_copy](<#/doc/utility/variadic/va_copy>)(desde C++11) | faz uma cópia dos argumentos de função variádica
(function macro)
[ va_end](<#/doc/utility/variadic/va_end>) | finaliza a travessia dos argumentos de função variádica
(function macro)

### Sinopse
```cpp
    namespace std {
      using va_list = /*see description*/ ;
    }
    #define va_arg(V, P) /*see description*/
    #define va_copy(VDST, VSRC) /*see description*/
    #define va_end(V) /*see description*/
    #define va_start(V, P) /*see description*/
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 2645](<https://cplusplus.github.io/CWG/issues/2645.html>) | C++98 | C++ define "promoções de argumento padrão", mas sua definição C foi usada | a definição C++ substitui a definição C