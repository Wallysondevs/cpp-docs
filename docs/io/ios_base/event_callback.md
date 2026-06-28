# std::ios_base::event_callback

typedef void ( *event_callback )( event type, ios_base& ios, int index );

  
O tipo de callbacks de função que podem ser registrados usando [register_callback()](<#/doc/io/ios_base/register_callback>) para serem chamados em eventos específicos.

type é um valor do tipo [`ios_base::event`](<#/doc/io/ios_base/event>) que indica o tipo do evento que invocará este callback.

ios refere-se ao objeto de stream para o qual o callback é invocado: *this é passado como argumento quando callbacks são invocados por funções membro de [std::ios_base](<#/doc/io/ios_base>) e [std::basic_ios](<#/doc/io/basic_ios>).

index é o valor fornecido pelo usuário passado para [register_callback()](<#/doc/io/ios_base/register_callback>) ao registrar a função.

### Veja também

[ copyfmt](<#/doc/io/basic_ios/copyfmt>) |  copia informações de formatação   
(função membro pública de `std::basic_ios<CharT,Traits>`)  
[ imbue](<#/doc/io/ios_base/imbue>) |  define o locale   
(função membro pública)  
[ (destructor)](<#/doc/io/ios_base/~ios_base>)[virtual] |  destrói o objeto   
(função membro pública virtual)  
[ register_callback](<#/doc/io/ios_base/register_callback>) |  registra função de callback de evento   
(função membro pública)