# Argumentos Variádicos

Permite que uma função aceite qualquer número de argumentos extras.

Uma função é variádica se o último parâmetro de sua [lista de parâmetros](<#/doc/language/function>) for uma elipse (...).

A vírgula que precede a elipse pode ser omitida. | (obsoleto em C++26)
```cpp
    // a função declarada como segue
    int printx(const char* fmt, ...);
    int printx(const char* fmt...); // o mesmo que acima, mas obsoleto desde C++26
     
    // pode ser chamada com um ou mais argumentos:
    printx("hello world");
    printx("a=%d b=%d", a, b);
     
    int printy(..., const char* fmt); // erro: ... só pode ser o último parâmetro
    int printz(...); // válido, mas os argumentos não podem ser acessados portavelmente
```

Isso é diferente de uma expansão de [parameter pack](<#/doc/language/parameter_pack>) de função, que é indicada por uma elipse que faz parte de um declarador de parâmetro, em vez de uma elipse ser um parâmetro sozinho. Tanto a expansão de parameter pack quanto a elipse "variádica" podem aparecer na declaração de um function template, como no caso de [std::is_function](<#/doc/types/is_function>). | (desde C++11)

### Promoções de argumento padrão

Quando uma função variádica é chamada, após as [conversões](<#/doc/language/implicit_cast>) de lvalue-para-rvalue, array-para-ponteiro e função-para-ponteiro, cada argumento que faz parte da lista de argumentos variáveis passa por conversões adicionais conhecidas como _promoções de argumento padrão_ :

*   [std::nullptr_t](<#/doc/types/nullptr_t>) é convertido para void*.

| (desde C++11)

*   argumentos float são convertidos para double como na [promoção de ponto flutuante](<#/doc/language/implicit_cast>).
*   bool, char, short e enumerações não escopadas são convertidos para int ou tipos inteiros mais amplos como na [promoção integral](<#/doc/language/implicit_cast>).

Tipos de classe não-POD(até C++11)Enumerações escopadas e tipos de classe com um construtor de cópia não-trivial elegível, um construtor de movimento não-trivial elegível, ou um destrutor não-trivial(desde C++11) são suportados condicionalmente em chamadas potencialmente avaliadas com semântica definida pela implementação (esses tipos são sempre suportados em [chamadas não avaliadas](<#/doc/language/expressions>)).

Como os parâmetros variádicos têm a menor precedência para fins de [overload resolution](<#/doc/language/overload_resolution>), eles são comumente usados como fallbacks catch-all em [SFINAE](<#/doc/language/sfinae>).

Dentro do corpo de uma função que usa argumentos variádicos, os valores desses argumentos podem ser acessados usando as [facilidades da biblioteca `<cstdarg>`](<#/doc/utility/variadic>):

Definido no header `[<cstdarg>](<#/doc/header/cstdarg>)`
---
[ va_start](<#/doc/utility/variadic/va_start>) | habilita o acesso a argumentos de função variádicos
(macro de função)
[ va_arg](<#/doc/utility/variadic/va_arg>) | acessa o próximo argumento de função variádico
(macro de função)
[ va_copy](<#/doc/utility/variadic/va_copy>)(C++11) | cria uma cópia dos argumentos de função variádicos
(macro de função)
[ va_end](<#/doc/utility/variadic/va_end>) | finaliza a travessia dos argumentos de função variádicos
(macro de função)
[ va_list](<#/doc/utility/variadic/va_list>) | contém as informações necessárias por [va_start](<#/doc/utility/variadic/va_start>), [va_arg](<#/doc/utility/variadic/va_arg>), [va_end](<#/doc/utility/variadic/va_end>), e [va_copy](<#/doc/utility/variadic/va_copy>)
(typedef)

O comportamento da macro [va_start](<#/doc/utility/variadic/va_start>) é indefinido se o último parâmetro antes da elipse tiver um tipo de referência, ou tiver um tipo que não seja [compatível](<#/>) com o tipo resultante das promoções de argumento padrão.

Se uma [pack expansion](<#/doc/language/parameter_pack>) ou uma entidade resultante de uma [lambda capture](<#/doc/language/lambda>) for usada como o último parâmetro em [va_start](<#/doc/utility/variadic/va_start>), o programa é malformado, sem diagnóstico requerido. | (desde C++11)

### Alternativas

*   [Variadic templates](<#/doc/language/parameter_pack>) também podem ser usados para criar funções que aceitam um número variável de argumentos. Eles são frequentemente a melhor escolha porque não impõem restrições nos tipos dos argumentos, não realizam promoções integrais e de ponto flutuante, e são type safe.
*   Se todos os argumentos variáveis compartilharem um tipo comum, um [std::initializer_list](<#/doc/utility/initializer_list>) fornece um mecanismo conveniente (embora com uma sintaxe diferente) para acessar argumentos variáveis. Neste caso, no entanto, os argumentos não podem ser modificados, pois [std::initializer_list](<#/doc/utility/initializer_list>) só pode fornecer um ponteiro const para seus elementos.

| (desde C++11)

### Notas

Na linguagem de programação C até C23, pelo menos um parâmetro nomeado deve aparecer antes do parâmetro de elipse, então R printz(...); não é válido até C23. Em C++, esta forma é permitida mesmo que os argumentos passados para tal função não sejam acessíveis, e é comumente usada como o overload de fallback em [SFINAE](<#/doc/language/sfinae>), explorando a menor prioridade da conversão de elipse em [overload resolution](<#/doc/language/overload_resolution>).

Esta sintaxe para argumentos variádicos foi introduzida em 1983 C++ sem a vírgula antes da elipse. Quando C89 adotou protótipos de função do C++, ele substituiu a sintaxe por uma que exigia a vírgula. Para compatibilidade, C++98 aceita tanto o estilo C++ f(int n...) quanto o estilo C f(int n, ...). A gramática original no estilo C++ está obsoleta desde C++26.

```cpp
A vírgula pode ser usada em function templates abreviados para fazer a elipse significar uma função variádica em vez de um variadic template: void f1(auto...); // o mesmo que template<class... Ts> void f3(Ts...)
void f2(auto, ...); // o mesmo que template<class T> void f3(T, ...)  // (desde C++20)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 506](<https://cplusplus.github.io/CWG/issues/506.html>) | C++98 | passar argumentos de classe não-POD para uma elipse resultava em comportamento indefinido | passar tais argumentos é suportado condicionalmente com semântica definida pela implementação
[CWG 634](<https://cplusplus.github.io/CWG/issues/634.html>) | C++98 | tipos de classe suportados condicionalmente faziam com que alguns idiomas SFINAE não funcionassem | sempre suportado se não avaliado
[CWG 2247](<https://cplusplus.github.io/CWG/issues/2247.html>) | C++11 | nenhuma restrição em passar parameter pack ou lambda capture para `va_start` | tornou-se malformado, sem diagnóstico requerido
[CWG 2347](<https://cplusplus.github.io/CWG/issues/2347.html>) | C++11 | não estava claro se enumerações escopadas passadas para uma elipse estavam sujeitas a promoções de argumento padrão | passar enumerações escopadas é suportado condicionalmente com semântica definida pela implementação

### Ver também

[documentação C](<#/>) para Argumentos Variádicos
---
[documentação C](<#/>) para Conversões implícitas