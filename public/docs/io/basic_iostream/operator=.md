# std::basic_iostream&lt;CharT,Traits&gt;::operator=

```cpp
basic_iostream& operator=( const basic_iostream& other ) = delete;  // (1)
protected:
basic_iostream& operator=( basic_iostream&& other );  // (2) (desde C++11)
```

Atribui outro objeto de stream.

1) A atribuição por cópia não é permitida.

2) Atribui por movimento outro objeto de stream. Efetivamente chama swap(rhs). Este operador de atribuição por movimento é protegido: ele é chamado pelos operadores de atribuição por movimento das classes de stream derivadas [std::basic_stringstream](<#/doc/io/basic_stringstream>) e [std::basic_fstream](<#/doc/io/basic_fstream>) que sabem como atribuir por movimento corretamente os buffers de stream associados.

### Parâmetros

- **other** — outro stream para atribuir o estado de

### Valor de retorno

*this

### Veja também

[ (construtor)](<#/doc/io/basic_iostream/basic_iostream>) | constrói o objeto
(função membro pública)