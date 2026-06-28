# std::future&lt;T&gt;::~future

```cpp
~future();  // (desde C++11)
```

  
Libera qualquer estado compartilhado. Isso significa: 

  * Se o objeto atual detém a última referência ao seu estado compartilhado, o estado compartilhado é destruído. 
  * O objeto atual desiste de sua referência ao seu estado compartilhado. 

  * Essas ações não bloquearão para que o estado compartilhado se torne pronto, exceto que elas podem bloquear se todas as seguintes condições forem satisfeitas: 
    * O estado compartilhado foi criado por uma chamada a [std::async](<#/doc/thread/async>). 
    * O estado compartilhado ainda não está pronto. 
    * O objeto atual era a última referência ao estado compartilhado. 

| (desde C++14)  