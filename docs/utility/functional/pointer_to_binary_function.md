# std::pointer_to_binary_function

template<   
class Arg1,   
class Arg2,  
class Result   
> class pointer_to_binary_function : public [std::binary_function](<#/doc/utility/functional/binary_function>)<Arg1, Arg2, Result>; |  |  (desde C++11)   
(removido em C++17)  

  
`std::pointer_to_binary_function` é um objeto de função que atua como um invólucro (wrapper) para uma função binária. 

### Funções membro

(construtor) |  constrói um novo objeto `pointer_to_binary_function` com a função fornecida   
(função membro pública)  
operator() |  chama a função armazenada   
(função membro pública)  
  
##  std::pointer_to_binary_function::pointer_to_binary_function

explicit pointer_to_binary_function( Result (*f)(Arg1,Arg2) );

  
Constrói um objeto de função `pointer_to_binary_function` com a função f armazenada. 

###  Parâmetros

f  |  \-  |  ponteiro para uma função a ser armazenada   
  
##  std::pointer_to_binary_function::operator()

Result operator()( Arg1 x1, Arg2 x2 ) const;

  
Chama a função armazenada. 

###  Parâmetros

x1, x2  |  \-  |  argumentos a serem passados para a função   
  
###  Valor de retorno

O valor retornado pela função chamada. 

### Veja também

[ pointer_to_unary_function](<#/doc/utility/functional/pointer_to_unary_function>)(desde C++11)(removido em C++17) |  invólucro (wrapper) compatível com adaptador para um ponteiro para função unária   
(modelo de classe)  
[ ptr_fun](<#/doc/utility/functional/ptr_fun>)(desde C++11)(removido em C++17) |  cria um objeto de função invólucro (wrapper) compatível com adaptador a partir de um ponteiro para função   
(modelo de função)