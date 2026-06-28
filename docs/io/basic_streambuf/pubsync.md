# std::basic_streambuf&lt;CharT,Traits&gt;::pubsync, std::basic_streambuf&lt;CharT,Traits&gt;::sync

```cpp
int pubsync();  // (1)
protected:
virtual int sync();  // (2)
```

  
Sincroniza a sequência de caracteres controlada (os buffers) com a sequência de caracteres associada.

1) Chama `sync()` da classe mais derivada

2) A versão da classe base desta função não tem efeito. As classes derivadas podem sobrescrever esta função para permitir a sincronização do dispositivo subjacente com os buffers.

Para streams de saída, isso tipicamente resulta na escrita do conteúdo da área de put na sequência associada, ou seja, o *flushing* do buffer de saída. Para streams de entrada, isso tipicamente esvazia a área de get e força uma releitura da sequência associada para captar mudanças recentes. O comportamento padrão (encontrado, por exemplo, em [std::basic_stringbuf](<#/doc/io/basic_stringbuf>)), é não fazer nada.

### Parâmetros

(nenhum)

### Valor de retorno

1) O valor de retorno de `sync()`.

2) Retorna ​0​ em caso de sucesso, -1 caso contrário. A versão da classe base retorna ​0​.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ sync](<#/doc/io/basic_istream/sync>) | sincroniza com o dispositivo de armazenamento subjacente   
(função membro pública de `std::basic_istream<CharT,Traits>`)  
[ sync](<#/doc/io/basic_filebuf/sync>)[virtual] | escreve caracteres no arquivo associado a partir da área de put   
(função membro protegida virtual de `std::basic_filebuf<CharT,Traits>`)