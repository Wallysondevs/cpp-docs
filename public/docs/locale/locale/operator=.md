# std::locale::operator=

```cpp
const locale& operator=( const locale& other ) throw();  // (até C++11)
const locale& operator=( const locale& other ) noexcept;  // (desde C++11)
```

  
Cria uma cópia de `other`, substituindo o conteúdo de `*this`. As contagens de referência de todas as `facets` mantidas por `other` são incrementadas. As contagens de referência de todas as `facets` previamente mantidas por `*this` são decrementadas, e aquelas `facets` cujas contagens de referência se tornam zero são deletadas.

### Valor de retorno

Retorna `*this`, que agora é uma cópia de `other`.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ (construtor)](<#/doc/locale/locale/locale>) | constrói uma nova locale   
(função membro pública)  