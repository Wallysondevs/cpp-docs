# std::pointer_to_unary_function

template<   
class Arg,   
class Result   
> class pointer_to_unary_function : public [std::unary_function](<#/doc/utility/functional/unary_function>)<Arg, Result>; |  |  (obsoleto desde C++11)   
(removido em C++17)  

  
`std::pointer_to_unary_function` é um objeto de função que atua como um wrapper em torno de uma função unária. 

### Funções Membro

(construtor) |  constrói um novo objeto `pointer_to_unary_function` com a função fornecida   
(função membro pública)  
operator() |  chama a função armazenada   
(função membro pública)  
  
##  std::pointer_to_unary_function::pointer_to_unary_function

explicit pointer_to_unary_function( Result (*f)(Arg) );

  
Constrói um objeto de função `pointer_to_unary_function` com a função f armazenada. 

###  Parâmetros

f  |  \-  |  ponteiro para uma função a ser armazenada   
  
##  std::pointer_to_unary_function::operator()

Result operator()( Arg x ) const;

  
Chama a função armazenada. 

###  Parâmetros

x  |  \-  |  argumento a ser passado para a função   
  
###  Valor de retorno

O valor retornado pela função chamada. 

### Ver também

[ pointer_to_binary_function](<#/doc/utility/functional/pointer_to_binary_function>)(obsoleto desde C++11)(removido em C++17) | wrapper compatível com adaptador para um ponteiro para função binária   
(modelo de classe)  
[ ptr_fun](<#/doc/utility/functional/ptr_fun>)(obsoleto desde C++11)(removido em C++17) | cria um wrapper de objeto de função compatível com adaptador a partir de um ponteiro para função   
(modelo de função)