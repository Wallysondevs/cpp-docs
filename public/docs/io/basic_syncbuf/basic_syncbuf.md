# std::basic_syncbuf&lt;CharT,Traits,Allocator&gt;::basic_syncbuf

```cpp
basic_syncbuf()
: basic_syncbuf( nullptr )  // (1)
explicit basic_syncbuf( streambuf_type* obuf )
: basic_syncbuf( obuf, Allocator() ) {}  // (2)
basic_syncbuf( streambuf_type* obuf, const Allocator& a );  // (3)
basic_syncbuf( basic_syncbuf&& rhs );  // (4)
```

  
1) Construtor padrão: cria uma instância de `std::basic_syncbuf` com a política emit-on-sync definida como false, streambuffer encapsulado definido como nullptr, e usando um `Allocator` construído por padrão como o alocador para armazenamento temporário.

2,3) Cria uma instância de `std::basic_syncbuf` com a política emit-on-sync definida como false, streambuffer encapsulado definido como obuf, e usando `a` como o alocador para armazenamento temporário.

4) Construtor de movimento: constrói por movimento um objeto `std::basic_syncbuf` movendo todo o conteúdo de outro objeto `std::basic_syncbuf` `rhs`, incluindo o armazenamento temporário, o ponteiro do stream encapsulado, a política e todo o outro estado (como o ponteiro do mutex). Após o movimento, `rhs` não está associado a um stream, e `rhs.get_wrapped() == nullptr`. Os ponteiros de membro da área de put da classe base [std::basic_streambuf](<#/doc/io/basic_streambuf>) de `rhs` são garantidos como nulos. Destruir um `rhs` do qual foi movido não produzirá nenhuma saída.

### Parâmetros

obuf  |  \-  |  ponteiro para o [std::basic_streambuf](<#/doc/io/basic_streambuf>) a ser encapsulado   
---|---|---
a  |  \-  |  o alocador a ser usado para armazenamento temporário   
rhs  |  \-  |  outro `std::basic_syncbuf` do qual mover   
  
### Exceções

2,3) Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) do construtor do armazenamento temporário interno ou [std::system_error](<#/doc/error/system_error>) da construção do mutex.

### Notas

Geralmente chamado pelos construtores apropriados de `std::basic_osyncstream`. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ sync](<#/doc/io/basic_streambuf/pubsync>)[virtual] |  sincroniza os buffers com a sequência de caracteres associada   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ emit](<#/doc/io/basic_syncbuf/emit>) |  transmite atomicamente o buffer interno completo para o streambuffer encapsulado   
(função membro pública)