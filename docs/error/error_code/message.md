# std::error_code::message

[std::string](<#/doc/string/basic_string>) message() const; | | (desde C++11)

Retorna a mensagem correspondente ao valor e categoria do código de erro atual.

Equivalente a category().message(value()).

### Parâmetros

(nenhum)

### Valor de retorno

A mensagem de erro correspondente ao valor e categoria do código de erro atual.

### Exceções

Pode lançar exceções definidas pela implementação.