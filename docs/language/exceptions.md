# Exceções

O tratamento de exceções oferece uma maneira de transferir o controle e informações de algum ponto na execução de um programa para um handler associado a um ponto previamente passado pela execução (em outras palavras, o tratamento de exceções transfere o controle para cima na pilha de chamadas).

Avaliar uma [expressão throw](<#/doc/language/throw>) lançará uma exceção. Exceções também podem ser lançadas em [outros contextos](<#/doc/language/throw>).

Para que uma exceção seja capturada, a expressão throw deve estar dentro de um [bloco try](<#/doc/language/try>), e o bloco try deve conter um [handler](<#/doc/language/catch>) que corresponda ao tipo do objeto de exceção.

Ao declarar uma função, a(s) seguinte(s) especificação(ões) pode(m) ser fornecida(s) para limitar os tipos de exceções que uma função pode lançar:

  * [especificações de exceção dinâmicas](<#/doc/language/except_spec>)

| (até C++17)

  * [especificações noexcept](<#/doc/language/noexcept_spec>)

| (desde C++11)

Erros que surgem durante o tratamento de exceções são tratados por [std::terminate](<#/doc/error/terminate>) e [std::unexpected](<#/doc/error/unexpected>)(até C++17).

### Uso

Embora a expressão throw possa ser usada para transferir o controle para um bloco de código arbitrário na pilha de execução, por razões arbitrárias (semelhante a [std::longjmp](<#/doc/utility/program/longjmp>)), seu uso pretendido é o tratamento de erros.

#### Tratamento de erros

Lançar uma exceção é usado para sinalizar erros de funções, onde "erros" são tipicamente limitados apenas aos seguintes[1](<#/doc/language/exceptions>)[2](<#/doc/language/exceptions>)[3](<#/doc/language/exceptions>):

  1. Falhas em atender às pós-condições, como falhar em produzir um objeto de valor de retorno válido.
  2. Falhas em atender às pré-condições de outra função que deve ser chamada.
  3. (para funções membro não-privadas) Falhas em (re)estabelecer um invariante de classe.

Em particular, isso implica que as falhas de construtores (veja também [RAII](<#/doc/language/raii>)) e da maioria dos operadores devem ser reportadas lançando exceções.

Além disso, as chamadas funções de _contrato amplo_ usam exceções para indicar entradas inaceitáveis, por exemplo, [std::basic_string::at](<#/doc/string/basic_string/at>) não tem pré-condições, mas lança uma exceção para indicar índice fora do limite.

#### Segurança de exceção

Após a condição de erro ser reportada por uma função, garantias adicionais podem ser fornecidas em relação ao estado do programa. Os quatro níveis de garantia de exceção a seguir são geralmente reconhecidos[4](<#/doc/language/exceptions>)[5](<#/doc/language/exceptions>)[6](<#/doc/language/exceptions>), que são superconjuntos estritos uns dos outros:

  1. _Garantia de exceção Nothrow (ou nofail)_ — a função nunca lança exceções. Nothrow (erros são reportados por outros meios ou ocultados) é esperado de [destrutores](<#/doc/language/destructor>) e outras funções que podem ser chamadas durante o desenrolamento da pilha. Os [destrutores](<#/doc/language/destructor>) são [`noexcept`](<#/doc/language/noexcept>) por padrão.(desde C++11) Nofail (a função sempre é bem-sucedida) é esperado de swaps, [move constructors](<#/doc/language/move_constructor>), e outras funções usadas por aquelas que fornecem garantia de exceção forte.
  2. _Garantia de exceção forte_ — Se a função lança uma exceção, o estado do programa é revertido para o estado imediatamente anterior à chamada da função (por exemplo, [std::vector::push_back](<#/doc/container/vector/push_back>)).
  3. _Garantia de exceção básica_ — Se a função lança uma exceção, o programa está em um estado válido. Nenhum recurso é vazado, e todos os invariantes dos objetos estão intactos.
  4. _Nenhuma garantia de exceção_ — Se a função lança uma exceção, o programa pode não estar em um estado válido: vazamentos de recursos, corrupção de memória ou outros erros que destroem invariantes podem ter ocorrido.

Componentes genéricos podem, adicionalmente, oferecer _garantia de exceção neutra_ : se uma exceção é lançada de um parâmetro de template (por exemplo, do objeto de função `Compare` de [std::sort](<#/doc/algorithm/sort>) ou do construtor de `T` em [std::make_shared](<#/doc/memory/shared_ptr/make_shared>)), ela é propagada, inalterada, para o chamador.

### Objetos de exceção

Embora objetos de qualquer tipo completo e ponteiros cv para void possam ser lançados como objetos de exceção, todas as funções da standard library lançam objetos sem nome por valor, e os tipos desses objetos são derivados (direta ou indiretamente) de [std::exception](<#/doc/error/exception>). Exceções definidas pelo usuário geralmente seguem este padrão.[7](<#/doc/language/exceptions>)[8](<#/doc/language/exceptions>)[9](<#/doc/language/exceptions>)

Para evitar cópias desnecessárias do objeto de exceção e object slicing, a melhor prática para handlers é capturar por referência.[10](<#/doc/language/exceptions>)[11](<#/doc/language/exceptions>)[12](<#/doc/language/exceptions>)[13](<#/doc/language/exceptions>)

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_constexpr_exceptions`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | exceções constexpr

### Links externos

  1. [↑](<#/doc/language/exceptions>) H. Sutter (2004) ["When and How to Use Exceptions"](<https://www.drdobbs.com/when-and-how-to-use-exceptions/184401836>) in Dr. Dobb's
  2. [↑](<#/doc/language/exceptions>) H. Sutter, A. Alexandrescu (2004), "C++ Coding Standards", Item 70
  3. [↑](<#/doc/language/exceptions>) C++ Core Guidelines [I.10: Use exceptions to signal a failure to perform a required task](<https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Ri-except>)
  4. [↑](<#/doc/language/exceptions>) B. Stroustrup (2000), "The C++ Programming Language" [Appendix E](<https://stroustrup.com/3rd_safe.pdf>)
  5. [↑](<#/doc/language/exceptions>) H. Sutter (2000) "Exceptional C++"
  6. [↑](<#/doc/language/exceptions>) D. Abrahams (2001) ["Exception Safety in Generic Components"](<https://www.boost.org/community/exception_safety.html>)
  7. [↑](<#/doc/language/exceptions>) D. Abrahams (2001) ["Error and Exception Handling"](<https://www.boost.org/community/error_handling.html>)
  8. [↑](<#/doc/language/exceptions>) isocpp.org Super-FAQ ["What should I throw?"](<https://isocpp.org/wiki/faq/exceptions#what-to-throw>)
  9. [↑](<#/doc/language/exceptions>) C++ Core Guidelines [E.14: Use purpose-designed user-defined types as exceptions (not built-in types)](<https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Re-exception-types>)
  10. [↑](<#/doc/language/exceptions>) C++ Core Guidelines [E.15: Throw by value, catch exceptions from a hierarchy by reference](<https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Re-exception-ref>)
  11. [↑](<#/doc/language/exceptions>) S. Meyers (1996) "More Effective C++" Item 13
  12. [↑](<#/doc/language/exceptions>) isocpp.org Super-FAQ ["What should I catch?"](<https://isocpp.org/wiki/faq/exceptions#what-to-catch>)
  13. [↑](<#/doc/language/exceptions>) H. Sutter, A. Alexandrescu (2004) "C++ Coding Standards" Item 73

---