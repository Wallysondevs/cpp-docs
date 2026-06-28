# std::unexpected

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
void unexpected();
[[noreturn]] void unexpected();
(removido em C++17)
```

  
`std::unexpected()` é chamada pelo runtime C++ quando uma [especificação de exceção dinâmica](<#/doc/language/except_spec>) é violada: uma exceção é lançada de uma função cuja especificação de exceção proíbe exceções deste tipo. 

`std::unexpected()` também pode ser chamada diretamente do programa. 

Em ambos os casos, `std::unexpected` chama o [std::unexpected_handler](<#/doc/error/exception/unexpected_handler>) atualmente instalado. O [std::unexpected_handler](<#/doc/error/exception/unexpected_handler>) padrão chama [std::terminate](<#/doc/error/terminate>). 

Se um destrutor redefiniu o handler de `unexpected` durante o desenrolamento da pilha e o desenrolamento posteriormente levou à chamada de `unexpected`, o handler que foi instalado no final da expressão `throw` é o que será chamado (nota: era ambíguo se relançar aplicava os novos handlers).  | (até C++11)  
---|---
Se um destrutor redefiniu o handler de `unexpected` durante o desenrolamento da pilha, é não especificado qual handler é chamado se o desenrolamento posteriormente levou à chamada de `unexpected`.  | (desde C++11)  
  
### Exceções

Lança qualquer exceção lançada pelo [std::unexpected_handler](<#/doc/error/exception/unexpected_handler>) atualmente instalado. 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 2111](<https://cplusplus.github.io/LWG/issue2111>) | C++11  | efeito de chamar [std::set_unexpected](<#/doc/error/exception/set_unexpected>) durante o desenrolamento da pilha  
difere do C++98 e quebra algumas ABIs  | tornado não especificado   
  
### Veja também

[ unexpected](<#/doc/utility/expected/unexpected>)(C++23) |  representado como um valor inesperado   
(modelo de classe)  
[ unexpected_handler](<#/doc/error/exception/unexpected_handler>)(obsoleto em C++11)(removido em C++17) |  o tipo da função chamada por **std::unexpected**   
(typedef)