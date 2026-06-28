# std::basic_filebuf&lt;CharT,Traits&gt;::basic_filebuf

```cpp
basic_filebuf();  // (1)
basic_filebuf( const std::basic_filebuf& rhs ) = delete;  // (2) (desde C++11)
basic_filebuf( std::basic_filebuf&& rhs );  // (3) (desde C++11)
```

  
Constrói um novo objeto `std::basic_filebuf`.

1) Constrói um objeto `std::basic_filebuf`, inicializando a classe base chamando o construtor padrão de [std::basic_streambuf](<#/doc/io/basic_streambuf>). O `basic_filebuf` criado não está associado a um arquivo, e [is_open()](<#/doc/io/basic_filebuf/is_open>) retorna `false`.

2) O construtor de cópia é deletado; `std::basic_filebuf` não é [CopyConstructible](<#/doc/named_req/CopyConstructible>).

3) Constrói por movimento (move-constructs) um objeto `std::basic_filebuf` movendo todo o conteúdo de outro objeto `std::basic_filebuf` `rhs`, incluindo os buffers, o arquivo associado, o locale, o openmode, a variável is_open, e todo o outro estado. Após o movimento, `rhs` não está associado a um arquivo e `rhs.is_open() == false`. Os ponteiros membros da classe base [std::basic_streambuf](<#/doc/io/basic_streambuf>) de `rhs` e da classe base de `*this` são garantidos de apontar para buffers diferentes (a menos que sejam nulos).

### Parâmetros

rhs  |  \-  |  outro `basic_filebuf`  
  
### Notas

Tipicamente chamado pelo construtor de [std::basic_fstream](<#/doc/io/basic_fstream>). 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ operator=](<#/>)(desde C++11) |  atribui um objeto `basic_filebuf`   
(função membro pública)  
[ (destructor)](<#/doc/io/basic_filebuf/~basic_filebuf>)[virtual] |  destrói um objeto `basic_filebuf` e fecha o arquivo se estiver aberto   
(função membro pública virtual)