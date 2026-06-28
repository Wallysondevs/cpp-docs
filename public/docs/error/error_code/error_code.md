# std::error_code::error_code

```cpp
error_code() noexcept;  // (1) (desde C++11)
error_code( int ec, const error_category& ecat ) noexcept;  // (2) (desde C++11)
template< class ErrorCodeEnum >
error_code( ErrorCodeEnum e ) noexcept;  // (3) (desde C++11)
error_code( const error_code& other ) = default;  // (4) (desde C++11)
(declarado implicitamente)
error_code( error_code&& other ) = default;  // (5) (desde C++11)
(declarado implicitamente)
```

  
Constrói um novo código de erro. 

1) Constrói um código de erro com valor padrão. Equivalente a error_code(0, [std::system_category](<#/doc/error/system_category>)()).

2) Constrói um código de erro com `ec` como o código de erro dependente da plataforma e `ecat` como a [categoria de erro](<#/doc/error/error_category>) correspondente.

3) Constrói um código de erro a partir de um enum de código de erro `e`. Equivalente a make_error_code(e), onde `make_error_code` é encontrado apenas por [argument-dependent lookup](<#/doc/language/adl>). Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_error_code_enum](<#/doc/error/error_code/is_error_code_enum>)&lt;ErrorCodeEnum&gt;::value for verdadeiro.

4,5) Construtor de cópia e construtor de movimento definidos implicitamente. Inicializa o código de erro com o conteúdo do outro.

### Parâmetros

other  |  \-  |  outro código de erro para inicializar   
---|---|---
ec  |  \-  |  código de erro dependente da plataforma para construir   
ecat  |  \-  |  categoria de erro correspondente a `ec`  
e  |  \-  |  enum de código de erro para construir   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3629](<https://cplusplus.github.io/LWG/issue3629>) | C++11  | apenas as sobrecargas de `std::make_error_code` eram usadas  | Sobrecargas encontradas por ADL são usadas   
  
### Ver também

[ make_error_code(std::errc)](<#/doc/error/errc/make_error_code>)(C++11) |  cria valor de código de erro para o enum `errc` e   
(função)  
[ make_error_code(std::io_errc)](<#/doc/io/io_errc/make_error_code>)(C++11) |  constrói um código de erro de iostream   
(função)  
[ make_error_code(std::future_errc)](<#/doc/thread/future_errc/make_error_code>)(C++11) |  constrói um código de erro de future   
(função)