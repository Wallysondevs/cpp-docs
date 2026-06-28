# deduction guides para std::function

Definido no header `[<functional>](<#/doc/header/functional>)`

```cpp
template< class R, class... ArgTypes >
function( R(*)(ArgTypes...) ) -> function<R(ArgTypes...)>;  // (1) (desde C++17)
template< class F >
function( F ) -> function</*see below*/>;  // (2) (desde C++17)
template< class F >
function( F ) -> function</*see below*/>;  // (3) (desde C++23)
template< class F >
function( F ) -> function</*see below*/>;  // (4) (desde C++23)
```

1) Este [deduction guide](<#/doc/language/ctad>) é fornecido para [std::function](<#/doc/utility/functional/function>) para permitir a dedução a partir de funções.

2) Esta sobrecarga participa da resolução de sobrecarga apenas se &F::operator() for bem-formado quando tratado como um operando não avaliado e decltype(&F::operator()) for da forma R(G::*)(A...) (opcionalmente cv-qualified, opcionalmente noexcept, opcionalmente lvalue reference qualified). O tipo deduzido é [std::function](<#/doc/utility/functional/function>)<R(A...)>.

3) Esta sobrecarga participa da resolução de sobrecarga apenas se &F::operator() for bem-formado quando tratado como um operando não avaliado e F::operator() for uma [função de parâmetro de objeto explícito](<#/doc/language/member_functions>) cujo tipo é da forma R(G, A...) ou R(G, A...) noexcept. O tipo deduzido é [std::function](<#/doc/utility/functional/function>)<R(A...)>.

4) Esta sobrecarga participa da resolução de sobrecarga apenas se &F::operator() for bem-formado quando tratado como um operando não avaliado e F::operator() for uma [função membro estática](<#/doc/language/static>) cujo tipo é da forma R(A...) ou R(A...) noexcept. O tipo deduzido é [std::function](<#/doc/utility/functional/function>)<R(A...)>.

### Notas

Estes deduction guides não permitem a dedução a partir de uma função com [parâmetro de reticências](<#/doc/language/variadic_arguments>), e o ... nos tipos é sempre tratado como uma [pack expansion](<#/doc/language/parameter_pack>).

O tipo deduzido por estes deduction guides pode mudar em uma revisão padrão posterior (em particular, isso pode acontecer se o suporte a noexcept for adicionado a [std::function](<#/doc/utility/functional/function>) em um padrão posterior).

### Exemplo

Execute este código
```cpp
    #include <functional>
    int func(double) { return 0; }
    int main() {
      std::function f{func}; // o guide #1 deduz function<int(double)>
      int i = 5;
      std::function g = & { return i; }; // o guide #2 deduz function<int(double)>
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3238](<https://cplusplus.github.io/LWG/issue3238>) | C++17 | o comportamento de (2) era incerto quando F::operator() é &&-qualified | esclarecido para ser excluído da resolução de sobrecarga