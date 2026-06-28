# std::error_condition::message

[std::string](<#/doc/string/basic_string>) message() const; | | (desde C++11)

Retorna uma mensagem explicativa para o valor de erro armazenado e a categoria de erro. Efetivamente chama category().message(value()).

### Parâmetros

(nenhum)

### Valor de retorno

Uma mensagem explicativa para o valor de erro armazenado e a categoria de erro.

### Exceções

Pode lançar exceções definidas pela implementação.

### Veja também

[ message](<#/doc/error/error_category/message>)[virtual] | obtém a string explicativa
(função membro pública virtual de `std::error_category`)