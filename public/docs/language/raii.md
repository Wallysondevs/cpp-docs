# RAII

_Aquisição de Recurso é Inicialização_ ou RAII, é uma técnica de programação C++[1](<#/doc/language/raii>)[2](<#/doc/language/raii>) que vincula o ciclo de vida de um recurso que deve ser adquirido antes do uso (memória heap alocada, thread de execução, socket aberto, arquivo aberto, mutex bloqueado, espaço em disco, conexão de banco de dados — qualquer coisa que exista em oferta limitada) ao [tempo de vida](<#/doc/language/lifetime>) de um objeto.

RAII garante que o recurso esteja disponível para qualquer função que possa acessar o objeto (a disponibilidade do recurso é um [invariante de classe](<https://en.wikipedia.org/wiki/Class_invariant> "enwiki: Class invariant"), eliminando testes redundantes em tempo de execução). Também garante que todos os recursos sejam liberados quando o tempo de vida do seu objeto controlador termina, na ordem inversa de aquisição. Da mesma forma, se a aquisição de recurso falhar (o construtor sair com uma exceção), todos os recursos adquiridos por cada membro e subobjeto base totalmente construído são liberados na ordem inversa de inicialização. Isso aproveita os recursos centrais da linguagem ([tempo de vida do objeto](<#/doc/language/lifetime>), [saída de escopo](<#/doc/language/statements>), [ordem de inicialização](<#/doc/language/initializer_list>) e [desempilhamento de pilha](<#/doc/language/throw>)) para eliminar vazamentos de recursos e garantir a segurança contra exceções. Outro nome para esta técnica é _Gerenciamento de Recursos Vinculado ao Escopo_ (SBRM), em referência ao caso de uso básico onde o tempo de vida de um objeto RAII termina devido à saída do escopo.

RAII pode ser resumido da seguinte forma:

  * encapsular cada recurso em uma classe, onde

    

  * o construtor adquire o recurso e estabelece todos os invariantes de classe ou lança uma exceção se isso não puder ser feito,
  * o destrutor libera o recurso e nunca lança exceções;

  * sempre usar o recurso através de uma instância de uma classe RAII que ou

    

  * tem duração de armazenamento automática ou tempo de vida temporário em si, ou
  * tem tempo de vida que é limitado pelo tempo de vida de um objeto automático ou temporário.

Move semantics permitem a transferência de recursos e propriedade entre objetos, dentro e fora de containers, e entre threads, garantindo a segurança dos recursos. | (desde C++11)

Classes com funções membro `open()`/`close()`, `lock()`/`unlock()`, ou `init()`/`copyFrom()`/`destroy()` são exemplos típicos de classes não-RAII:
```cpp
    std::mutex m;
    
    void bad() 
    {
        m.lock();             // adquire o mutex
        f();                  // se f() lançar uma exceção, o mutex nunca é liberado
        if (!everything_ok())
            return;           // retorno antecipado, o mutex nunca é liberado
        m.unlock();           // se bad() atingir esta instrução, o mutex é liberado
    }
    
    void good()
    {
        std::lock_guard<std::mutex> lk(m); // Classe RAII: aquisição de mutex é inicialização
        f();                               // se f() lançar uma exceção, o mutex é liberado
        if (!everything_ok())
            return;                        // retorno antecipado, o mutex é liberado
    }                                      // se good() retornar normalmente, o mutex é liberado
```

### A biblioteca padrão

As classes da biblioteca C++ que gerenciam seus próprios recursos seguem RAII: [std::string](<#/doc/string/basic_string>), [std::vector](<#/doc/container/vector>), [std::jthread](<#/doc/thread/jthread>)(desde C++20), e muitas outras adquirem seus recursos em construtores (que lançam exceções em caso de erros), os liberam em seus destrutores (que nunca lançam exceções), e não exigem limpeza explícita.

Além disso, a biblioteca padrão oferece vários wrappers RAII para gerenciar recursos fornecidos pelo usuário:

  * [std::unique_ptr](<#/doc/memory/unique_ptr>) e [std::shared_ptr](<#/doc/memory/shared_ptr>) através de [std::make_unique](<#/doc/memory/unique_ptr/make_unique>) e [std::make_shared](<#/doc/memory/shared_ptr/make_shared>) para gerenciar memória alocada dinamicamente;
  * [std::lock_guard](<#/doc/thread/lock_guard>), [std::unique_lock](<#/doc/thread/unique_lock>), [std::shared_lock](<#/doc/thread/shared_lock>) para gerenciar mutexes.

| (desde C++11)

### Notas

RAII não se aplica ao gerenciamento de recursos que não são adquiridos antes do uso: tempo de CPU, disponibilidade de núcleo, capacidade de cache, capacidade do pool de entropia, largura de banda da rede, consumo de energia elétrica, memória de pilha. Para tais recursos, um construtor de classe C++ não pode garantir a disponibilidade do recurso durante o tempo de vida do objeto, e outros meios de gerenciamento de recursos devem ser usados.

### Links externos

  1. [↑](<#/doc/language/raii>) [RAII no FAQ de C++ de Stroustrup](<https://www.stroustrup.com/bs_faq2.html#finally>)
  2. [↑](<#/doc/language/raii>) [C++ Core Guidelines E.6 "Use RAII para prevenir vazamentos"](<https://github.com/isocpp/CppCoreGuidelines/blob/master/CppCoreGuidelines.md#e6-use-raii-to-prevent-leaks>)
